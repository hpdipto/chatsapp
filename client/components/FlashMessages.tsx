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
				<div
					className="alert alert-success alert-dismissible fade show container col-sm-8"
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
			))}
		</div>
	);
};

export const ErrorMessages: React.FC<{
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
				<div
					className="alert alert-warning alert-dismissible fade show container col-sm-8"
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
			))}
		</div>
	);
};
