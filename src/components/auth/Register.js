import React from 'react';
import Cookies from 'js-cookie';
import RegisterForm from './RegisterForm';
import { request } from '../../lib/request';
export default class Register extends React.Component {
	state = {
		redirectToReferrer: false,
		error: false,
		success: false,
		loading: false,
	};

	showError = errorMessage =>
		this.setState({
			error: true,
			loading: false,
			message: errorMessage,
		});

	register = data => {
		this.setState({
			loading: true,
		});
		request('/api/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})
			.then(response => {
				if (response.ok) {
					setTimeout(() => (window.location = '/login'), 1000);
				} else {
					response.json().then(body => {
						this.showError(body.error);
					});
				}
			})
			.catch(err => {
				this.showError('');
			});
	};

	explain =
		'This will create a new temporary end user account that lasts up to 12 hours';

	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center' }}>Register a New User</h1>

				<div
					style={{
						textAlign: 'center',
						width: '500px',
						margin: 'auto',
						paddingBottom: '10px',
					}}
				>
					{this.explain}
				</div>
				{this.state.success ? (
					<h3 style={{ color: 'green', textAlign: 'center' }}>
						Registration success
					</h3>
				) : (
					''
				)}
				<RegisterForm
					onRegister={this.register}
					loading={this.state.loading}
					error={this.state.error}
					message={this.state.message}
				/>
			</div>
		);
	}
}
