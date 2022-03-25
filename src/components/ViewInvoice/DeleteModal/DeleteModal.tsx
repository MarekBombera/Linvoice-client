import ReactDom from 'react-dom';
import { Button } from '../../Button/Button';

type Props = {
	invoiceId: string;
	deleteInvoice: Function;
	toggleDeleteOption: Function;
};

export const DeleteModal = ({
	invoiceId,
	deleteInvoice,
	toggleDeleteOption,
}: Props): JSX.Element => {
	return ReactDom.createPortal(
		<>
			<div className="modal-overlay"></div>
			<div className="deleteModal" role="delete-modal">
				<h3>Confirm Deletion</h3>
				<p>
					Are you sure you want to delete invoice <span>{`#${invoiceId}`}</span>
					? This action cannot be undone.
				</p>
				<div className="deleteModal__buttons">
					<Button
						className="deleteModal-cancel"
						onClick={toggleDeleteOption}
						text={'Cancel'}
					/>
					<Button
						className="deleteModal-delete"
						onClick={deleteInvoice}
						text={'Delete'}
					/>
				</div>
			</div>
		</>,
		document.getElementById('portal')!
	);
};
