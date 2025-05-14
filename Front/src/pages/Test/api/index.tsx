import { useEffect, useState } from 'react'
import api from '../../../api'
import { Card, Container, Status } from './styles';
import { Riple } from 'react-loading-indicators';

interface Users {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		}
	},
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	}
}

interface Comments {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

const TestAPI = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const [comments, setComments] = useState<Comments[]>([]);

	const [userSituation, setUserSituation] = useState('load');
	const [commentSituation, setCommentSituation] = useState('load');

	useEffect(() => {
		api.get<Users[]>('/users')
			.then((response) => {
				setUsers(response.data);
			})
			.catch((err) => {
				setUserSituation('error');
				console.log(`Erro ao requisitar usuários: ${err}`);
			})
			.finally(() => {
				setUserSituation('done');
				console.log("Usuários requisitados com sucesso!");
			})

		api.get<Comments[]>('/comments')
			.then((response) => {
				setComments(response.data);
			})
			.catch((err) => {
				setCommentSituation('error');
				console.log(`Erro ao requisitar comentários: ${err}`);
			})
			.finally(() => {
				setCommentSituation('done');
				console.log("Comentários requisitados com sucesso!");
			})
	}, []);

	return (
		<>
			<Container>
				<Status>
					<div className="status">
						<span>Situação Users:</span>
						{userSituation === 'load' && <Riple color="#32cd32" size="small" text="" textColor="" />}
						{userSituation === 'error' && <span style={{ color: 'red' }}>Erro ao requisitar usuários</span>}
						{userSituation === 'done' && <span style={{ color: 'green' }}>Usuários requisitados com sucesso!</span>}
					</div>
					<div className="status">
						<span>Situação Comments:</span>
						{commentSituation === 'load' && <Riple color="#32cd32" size="small" text="" textColor="" />}
						{commentSituation === 'error' && <span style={{ color: 'red' }}>Erro ao requisitar comentários</span>}
						{commentSituation === 'done' && <span style={{ color: 'green' }}>Comentários requisitados com sucesso!</span>}
					</div>
				</Status>
				{comments.map((e: Comments) => {
					const userIndex = Math.floor(Math.random() * 10);
					return (
						<Card key={e.id}>
							<div className="usuario">
								<img className="profile-picture" src={`https://i.pravatar.cc/150?u=${users[userIndex].id}`} alt="Profile" />
								<h1 className="name">{users[userIndex].name}</h1>
								<h2 className="username">@{users[userIndex].username}</h2>
							</div>
							<div className="comment">
								{e.body}
							</div>
						</Card>
					)
				})}
			</Container>
		</>
	)
}

export default TestAPI