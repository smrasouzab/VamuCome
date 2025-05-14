import styled from "styled-components";

export const Container = styled.div`
  display: flex;
	flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
	gap: 30px;
	padding: 50px 0;
	background-color:rgb(30, 30, 30);
`;

export const Status = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;

	.status {
		font-family: "Albert Sans", sans-serif;
		font-size: 1.5rem;
		font-weight: 300;
		color: rgb(200, 200, 200);
	}
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgb(225, 225, 225);
	border-radius: 20px;
	padding: 10px;
	width: 30%;

	.usuario {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		width: 100%;
	}

	.profile-picture {
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}

	.name {
		font-family: "Albert Sans", sans-serif;
		font-size: 1.5rem;
		font-weight: 300;
		color: rgb(30, 30, 30);
	}

	.username {
		font-family: "Albert Sans", sans-serif;
		font-size: 0.8rem;
		font-weight: 300;
		color: rgb(120, 120, 120);
	}

	.comment {
		font-family: "Albert Sans", sans-serif;
		font-size: 1rem;
		font-weight: 300;
		color: rgb(30, 30, 30);
		padding: 10px;
	}
`;