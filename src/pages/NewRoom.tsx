import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export default function NewRoom() {
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState("");
	const history = useHistory();
	async function handleCreateRoom(ev: FormEvent) {
		ev.preventDefault();

		if (newRoom.trim() === "") {
			return;
		}

		const roomRef = database.ref("rooms");

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							onChange={(ev) => setNewRoom(ev.target.value)}
							type="text"
							placeholder="Nome da sala"
							value={newRoom}
						/>
						<Button type="submit">Criar na sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente?
						<Link to="/"> clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
