import * as React from "react";

export const SuccessMessage: React.FC<{ message: string }> = ({
	message,
}: {
	message: string;
}) => {
	return (
		<div>
			<div
				className="alert alert-success alert-dismissible fade show container col-sm-8"
				role="alert"
			>
				{message}
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
	);
};
