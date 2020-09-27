import * as React from "react";

export const SuccessMessages: React.FC<{
	messages: Array<string>;
	setMessages: any;
}> = ({
	messages,
	setMessages,
}: {
	messages: Array<string>;
	setMessages: any;
}) => {
	const removeMessage = (messages: any, index: number) => {
		var msg = [...messages];
		msg.splice(index, 1);
		return msg;
	};

	return (
		<div className="mt-2">
			{messages.map((message, index) => (
				<div className="row">
					<label htmlFor="empty" className="col-sm-3"></label>
					<div
						className="alert alert-success alert-dismissible fade show container col-sm-9"
						role="alert"
						key={index}
					>
						{message}
						<button
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
							onClick={() => setMessages((msg) => removeMessage(msg, index))}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				</div>
			))}
		</div>
	);
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
