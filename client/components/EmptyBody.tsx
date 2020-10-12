import * as React from "react";

import ChatRoomsModal from "./ChatRoomsModal";
import ChatRoomsAutoHide from "./ChatRoomsAutoHide";

const EmptyBody: React.FC = () => {
	return (
		<div className="container px-lg-5">
			<div className="row mx-lg-n5" style={{ height: "90vh" }}>
				<div
					className="modal fade"
					id="chatRooms"
					tabIndex={-1}
					area-hidden="true"
				>
					<div className="modal-dialog">
						<ChatRoomsModal
							roomsInfo={undefined}
							selectedRoomIndex={undefined}
							setSelectedRoomIndex={undefined}
							notJoinedRoomsInfo={undefined}
							setSelectedNotJoinedRoomIndex={undefined}
						/>
					</div>
				</div>

				<ChatRoomsAutoHide
					roomsInfo={undefined}
					selectedRoomIndex={undefined}
					setSelectedRoomIndex={undefined}
					notJoinedRoomsInfo={undefined}
					setSelectedNotJoinedRoomIndex={undefined}
				/>

				<div className="col border bg-light">
					<div
						className="left-panel-top border mx-lg-n3"
						style={{ background: "#c6e2f7" }}
					>
						<h3 className="pt-2  px-3">Guest Room</h3>
						<h5 className="px-3">guestRoom</h5>
					</div>
					<h3 className="mt-3">Hi there 👋 </h3>
					<h3>Welcome to ChatsApp 🎉 </h3>
					<h4>
						But we're sorry that until you <a href="/register">Register</a> /
						<a href="/login"> Login </a>
						we can't provide you our services
					</h4>
				</div>
			</div>
		</div>
	);
};

export default EmptyBody;
