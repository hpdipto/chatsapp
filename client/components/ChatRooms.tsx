import * as React from "react";
import { useRouter } from "next/router";

const ChatRooms: React.FC = () => {
	const router = useRouter();

	return (
		<div className="col-3 border bg-light">
			<div
				className="left-panel-top border mx-lg-n3"
				style={{ background: "#c6e2f7" }}
			>
				<h4 className="pt-2  px-3">Chat Rooms</h4>
				<form className="bd-search">
					<input
						type="text"
						className="form-control ds-input"
						placeholder="Search rooms..."
					/>
				</form>
			</div>

			<div
				className="left-panel-content d-flex flex-column mx-lg-n3 overflow-auto"
				style={{
					height: "calc(100vh - 30vh)",
				}}
			>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 1
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 2
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 3
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 4
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 5
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 5
				</div>
				<div className="bg-secondary text-left px-2 py-2 border room-name">
					Room 5
				</div>
			</div>

			<div
				className="left-panel-bottom mx-lg-n3"
				style={{
					background: "#c6e2f7",
					cursor: "pointer",
				}}
			>
				<div
					className="text-left py-2 px-2 mx-lg border create-room"
					onClick={() => router.push("/create")}
				>
					Create Room
				</div>
			</div>
		</div>
	);
};

export default ChatRooms;
