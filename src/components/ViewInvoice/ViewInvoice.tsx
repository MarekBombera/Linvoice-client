import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../reducers/';
import { toggleViewInvoice, toggleEditInvoice } from '../../actions/';

import { ViewInvoiceItem } from './ViewInvoiceItem/ViewInvoiceItem';
import { InvoiceStatus } from '../InvoiceStatus/InvoiceStatus';
import { DeleteModal } from './DeleteModal/DeleteModal';
import { InvoiceNav } from '../InvoiceNav/InvoiceNav';
import { ViewInvoiceField } from './ViewInvoiceField/ViewInvoiceField';
import { FormModel } from '../InvoiceForm/FormModel';
import { Button } from '../Button/Button';

import { becomeBackgroundStyling } from '../../utils/becomeBackgroundStyling';
import { getPaymentDue } from '../../utils/getPaymentDue';
import { calculateGrandTotal } from '../../utils/calculateGrandTotal';

import { httpDeleteInvoice, httpMarkAsPAid } from '../../requests/requests';

export const ViewInvoice = (): JSX.Element | null => {
	const [openDeleteModal, setOpenDelete] = useState<boolean>(false);
	const {
		viewInvoiceReducer,
		editInvoiceReducer,
		fetchedInvoicesReducer,
		googleAuthReducer,
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();

	const toggleDeleteOption = (): void => {
		setOpenDelete(!openDeleteModal);
	};

	const dispatchToggleViewInvoice = (invoiceId: string): void => {
		dispatch(
			toggleViewInvoice({
				toggle: false,
				invoiceId: invoiceId,
			})
		);
	};

	const dispatchToggleEditInvoice = (invoice: {}): void => {
		dispatch(
			toggleEditInvoice({
				toggle: true,
				selectedInvoice: invoice,
			})
		);
	};

	const renderViewInvoice = fetchedInvoicesReducer.map(
		(invoice: FormModel): JSX.Element | null => {
			const { invoiceId, billTo, billFrom, itemList } = invoice;

			if (invoiceId !== viewInvoiceReducer.invoiceId) {
				return null;
			}

			const openEditInvoice = (): void => {
				if (billTo.status === 'paid') {
					return;
				}
				dispatchToggleEditInvoice(invoice);
				dispatchToggleViewInvoice(invoiceId);
			};

			const markAsPaid = async (): Promise<void> => {
				if (billTo.status === 'paid') {
					return;
				}
				await httpMarkAsPAid(invoiceId, googleAuthReducer.userId);
				dispatchToggleViewInvoice('');
			};

			const deleteInvoice = async (): Promise<void> => {
				await httpDeleteInvoice(invoiceId, googleAuthReducer.userId);
				dispatchToggleViewInvoice('');
			};

			const parsedPaymentDue = getPaymentDue(
				billTo.invoiceDate,
				billTo.paymentTerms
			);

			return (
				<Fragment key={invoiceId}>
					<div
						className="ViewInvoice"
						role="view-invoice"
						style={becomeBackgroundStyling(
							editInvoiceReducer.toggle,
							viewInvoiceReducer.toggle,
							'viewInvoice'
						)}
					>
						<InvoiceNav
							action={toggleViewInvoice({
								toggle: false,
								invoiceId: '',
							})}
						/>
						<div className="ViewInvoice__status">
							<p className="ViewInvoice__status-tag">Status</p>
							<InvoiceStatus status={billTo.status} />
						</div>
						<div className="ViewInvoice__info">
							<div className="ViewInvoice__general">
								<ViewInvoiceField
									divClassName={'general-invoiceNumber'}
									p={'#'}
									h4={invoiceId}
								/>
								<ViewInvoiceField
									divClassName={'general-description'}
									p={billTo.projectDescription}
								/>
							</div>
							<div className="ViewInvoice__date-paymentDue-wrapper">
								<ViewInvoiceField
									divClassName={'date'}
									p={'invoice date'}
									h4={billTo.invoiceDate}
								/>
								<ViewInvoiceField
									divClassName={'paymentDue'}
									p={'paymentDue'}
									h4={`${parsedPaymentDue[2]} ${parsedPaymentDue[1]} ${parsedPaymentDue[3]}`}
								/>
							</div>
							<div className="ViewInvoice__billTo">
								<ViewInvoiceField p={'bill to'} h4={billTo.clientName} />
								<ViewInvoiceField
									multipleP={[
										billTo.streetAddress,
										billTo.city,
										billTo.postCode,
										billTo.country,
									]}
								/>
							</div>
							<div className="ViewInvoice__billFrom">
								<ViewInvoiceField
									multipleP={[
										billFrom.streetAddress,
										billFrom.city,
										billFrom.postCode,
										billFrom.country,
									]}
								/>
							</div>
							<div className="ViewInvoice__sentTo">
								<ViewInvoiceField p={'sent to'} h4={billTo.clientEmail} />
							</div>
							<div className="ViewInvoice__itemList">
								<div className="ViewInvoice-itemsWrapper">
									<p className="viewInvoiceItem-tag viewInvoiceItem-tag-itemName">
										Item Name
									</p>
									<p className="viewInvoiceItem-tag viewInvoiceItem-tag-quantity">
										QTY.
									</p>
									<p className="viewInvoiceItem-tag viewInvoiceItem-tag-price">
										Price
									</p>
									<p className="viewInvoiceItem-tag viewInvoiceItem-tag-total">
										Total
									</p>
									{itemList.map((item, index) => {
										return (
											<Fragment key={index}>
												<ViewInvoiceItem item={item} />
											</Fragment>
										);
									})}
								</div>
								<div className="ViewInvoice__total">
									<p>Grand Total</p>
									<h2>{`${'$'} ${calculateGrandTotal(itemList)}`}</h2>
								</div>
							</div>
						</div>
						<div className="ViewInvoice__buttons">
							<Button
								className="ViewInvoice__buttons-edit"
								onClick={openEditInvoice}
								text={'Edit'}
							/>
							<Button
								className="ViewInvoice__buttons-delete"
								onClick={toggleDeleteOption}
								text={'Delete'}
							/>
							<Button
								className="ViewInvoice__buttons-paid"
								onClick={markAsPaid}
								text={'Mark as Paid'}
							/>
						</div>
					</div>
					{!openDeleteModal ? null : (
						<DeleteModal
							invoiceId={invoiceId}
							deleteInvoice={deleteInvoice}
							toggleDeleteOption={toggleDeleteOption}
						/>
					)}
				</Fragment>
			);
		}
	);

	return <>{renderViewInvoice}</>;
};
