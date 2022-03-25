import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { filterInvoices } from '../../../actions';
import { useMediaQueryMatch } from '../../../hooks/useMediaQueryMatch/useMediaQueryMatch';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';

import arrow_down_img from '../../../assets/icon-arrow-down.svg';

export const Filter = (): JSX.Element => {
	const [paidChecked, setPaidChecked] = useState(false);
	const [pendingChecked, setPendingChecked] = useState(false);

	const dispatch = useDispatch();

	const filterDropdown = document.querySelector(
		'.overview__panel-actions-filter-dropdown'
	);
	const dropdownClassActive = 'overview__panel-actions-filter-dropdown--active';

	const toggleFilterDropdown = (): void => {
		filterDropdown!.classList.toggle(dropdownClassActive);
	};

	const closeFilterOnOutsideClick = (): void => {
		filterDropdown!.classList.remove(dropdownClassActive);
	};

	const dropDownRef = useClickOutside(() => {
		if (document.querySelector(`.${dropdownClassActive}`)) {
			setTimeout(() => {
				closeFilterOnOutsideClick();
			}, 100);
		}
	});

	const setOneFilterOptionAtTime = (e: React.MouseEvent<HTMLElement>): void => {
		const filterTarget = e.currentTarget.classList;

		if (filterTarget.contains('checkbox-paid') && pendingChecked) {
			setPendingChecked(false);
		}
		if (filterTarget.contains('checkbox-pending') && paidChecked) {
			setPaidChecked(false);
		}
	};

	useEffect(() => {
		if (paidChecked) {
			dispatch(filterInvoices('pending'));
		}
		if (pendingChecked) {
			dispatch(filterInvoices('paid'));
		}
		if (!paidChecked && !pendingChecked) {
			dispatch(filterInvoices('all'));
		}
	}, [paidChecked, pendingChecked, dispatch]);

	return (
		<>
			<div
				className="overview__panel-actions-filter"
				onClick={() => toggleFilterDropdown()}
			>
				<p>{useMediaQueryMatch('phone') ? 'Filter' : 'Filter by status'}</p>
				<div
					className="overview__panel-actions-filter-dropdown"
					ref={dropDownRef}
				>
					<div className="overview__panel-actions-filter-paid">
						<label className="overview__panel-actions-filter-checkbox">
							<input
								className="checkbox-paid"
								type="checkbox"
								onChange={(e) => setPaidChecked(e.target.checked)}
								onClick={(e) => setOneFilterOptionAtTime(e)}
								checked={paidChecked}
							></input>
							<div className="overview__panel-actions-filter-checkbox-box"></div>
							Paid
						</label>
					</div>
					<div className="overview__panel-actions-filter-pending">
						<label className="overview__panel-actions-filter-checkbox">
							<input
								className="checkbox-pending"
								type="checkbox"
								onClick={(e) => setOneFilterOptionAtTime(e)}
								onChange={(e) => setPendingChecked(e.target.checked)}
								checked={pendingChecked}
							></input>
							<div className="overview__panel-actions-filter-checkbox-box"></div>
							Pending
						</label>
					</div>
				</div>
				<img src={arrow_down_img} alt="filter expand" />
			</div>
		</>
	);
};
