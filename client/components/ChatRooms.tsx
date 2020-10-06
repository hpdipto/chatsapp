import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ChatRooms: React.FC<{
	roomsInfo;
	setSelectedRoomIndex;
	notJoinedRooms;
	setSelectedNotJoinedRoomIndex;
}> = ({
	roomsInfo,
	setSelectedRoomIndex,
	notJoinedRooms,
	setSelectedNotJoinedRoomIndex,
}: {
	roomsInfo: any;
	setSelectedRoomIndex: any;
	notJoinedRooms: any;
	setSelectedNotJoinedRoomIndex: any;
}) => {
	const router = useRouter();
	const { isAuthenticated } = useSelector((state) => state.auth);

	return (
		<div className="col-3 border bg-light">
			<div
				className="left-panel-top border mx-lg-n3"
				style={{ background: "#c6e2f7" }}
			>
				<h4 className="pt-2 px-3">Chat Rooms</h4>
				<div className="dropdown">
					<form
						className="bd-search"
						data-toggle="dropdown"
						area-expanded="false"
					>
						<input
							type="text"
							className="form-control ds-input"
							placeholder="Search rooms..."
							data-toggle="dropdown"
							aria-expanded="false"
						/>

						{notJoinedRooms && (
							<div className="dropdown-menu w-100">
								{notJoinedRooms
									? notJoinedRooms.map((njr, index) => (
											<div key={index}>
												<span
													className="dropdown-item"
													style={{
														cursor: "pointer",
													}}
													onClick={() => setSelectedNotJoinedRoomIndex(index)}
												>
													{njr.roomName}
												</span>

												{index != notJoinedRooms.length - 1 && (
													<div className="dropdown-divider"></div>
												)}
											</div>
									  ))
									: null}
							</div>
						)}
					</form>
				</div>
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
				{isAuthenticated ? (
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
