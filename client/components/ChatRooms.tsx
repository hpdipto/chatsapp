import * as React from "react";
import { useRouter } from "next/router";

const ChatRooms: React.FC<{ roomsInfo; setSelectedRoomIndex }> = ({
	roomsInfo,
	setSelectedRoomIndex,
}: {
	roomsInfo: any;
	setSelectedRoomIndex;
}) => {
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
				{roomsInfo &&
					roomsInfo.map((room, index) => {
						return (
							<div
								className="bg-secondary text-left px-2 py-2 border room-name"
								key={index}
								onClick={() => setSelectedRoomIndex(room.index)}
							>
								{room.roomName}
							</div>
						);
					})}
			</div>

			<div
				className="left-panel-bottom mx-lg-n3"
				style={{
					background: "#c6e2f7",
					cursor: "pointer",
				}}
			>
				{roomsInfo ? (
					<div
						className="text-left py-2 px-2 mx-lg border create-room"
						onClick={() => router.push("/create")}
					>
						Create Room
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ChatRooms;
