import React from "react";
import { useParams, useHistory } from "react-router";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";
type RoomParams = {
	id: string;
};

export default function AdminRoom() {
	// const { user } = useAuth();
	const history = useHistory();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { title, questions } = useRoom(roomId);

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm("Tem certeza que você deseja excluir esta pergunta ?")) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}

		history.push("/");
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar Sala
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>

				<div className="question-list">
					{questions.map((question) => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
						>
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt="" />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
}