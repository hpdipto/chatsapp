import * as React from "react";

export const SuccessMessage = ({ message }) => {
	const [closeAlert, setCloseAlert] = React.useState(false);

	const handleClose = () => {
		setCloseAlert(true);
	};

	if (!closeAlert) {
		return (
			<>
				<label htmlFor="empty" className="col-sm-3"></label>
				<div
					className="alert alert-success alert-dismissible fade show container col-sm-9"
					role="alert"
				>
					{message}
					<button
						type="button"
						className="close"
						data-dismiss="alert"
						aria-label="Close"
						onClick={() => handleClose()}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</>
		);
	} else {
		return <div></div>;
	}
};

export const ErrorMessage = ({ message }) => {
	const [closeAlert, setCloseAlert] = React.useState(false);

	const handleClose = () => {
		setCloseAlert(true);
	};

	if (!closeAlert) {
		return (
			<>
				<label htmlFor="empty" className="col-sm-3"></label>
				<div
					className="alert alert-warning alert-dismissible fade show container col-sm-9"
					role="alert"
				>
					{message}
					<button
						type="button"
						className="close"
						data-dismiss="alert"
						aria-label="Close"
						onClick={() => handleClose()}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</>
		);
	} else {
		return <div></div>;
	}
};
