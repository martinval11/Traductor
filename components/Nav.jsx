import React, { useState, useEffect } from 'react';
import { Navbar, Button, Link, Text, Badge } from '@nextui-org/react';
import { Layout } from './Layout.js';
import { AcmeLogo } from './AcmeLogo.js';
import { MoonFill, SunFill } from 'react-bootstrap-icons';

const Nav = () => {
	const [darkMode, isDarkMode] = useState(false);

	useEffect(() => {
		const get = window.localStorage.getItem('theme');

		if (get !== undefined || get !== null) {
			const element = document.body;
			if (get === 'dark') {
				element.classList.remove('light');
				element.classList.toggle('dark');
				isDarkMode(true);
			} else {
				element.classList.remove('dark');
				element.classList.toggle('light');
				isDarkMode(false);
			}
		}
	}, []);

	const Icon = () => {
		//		{theme ? <SunFill id='sun' /> : <MoonFill id='moon' />}
		if (darkMode) {
			return <SunFill />;
		} else {
			return <MoonFill />;
		}
	};

	return (
		<>
			<div id='nav-desktop'>
				<Layout>
					<Navbar shouldHideOnScroll isBordered variant='sticky'>
						<Navbar.Brand>
							<AcmeLogo />
							<Text b color='inherit' hideIn='xs'>
								Traductor <Badge color='primary' title='Esta es una versión de prueba, no es la versión final. Los servidores se caerán a menudo y la página puede contener errores.'>Beta</Badge>
							</Text>
						</Navbar.Brand>
						<Navbar.Content hideIn='xs' variant='underline'>
							<Navbar.Link isActive href='#'>
								Inicio
							</Navbar.Link>
							<Navbar.Link
								href='https://github.com/martinval11/Traductor'
								target='_blank'
								rel='noopener noreferrer'
							>
								GitHub
							</Navbar.Link>
							<Navbar.Link
								href='https://www.isitdownrightnow.com/libretranslate.de.html'
								target='_blank'
								rel='noopener noreferrer'
							>
								Estado del servicio
							</Navbar.Link>
						</Navbar.Content>
						<Navbar.Content>
							<Navbar.Item>
								<Button
									auto
									gradient
									light
									onPress={() => {
										let element = document.body;
										if (darkMode !== false) {
											window.localStorage.setItem('theme', 'light');
											element.classList.remove('dark');
											element.classList.toggle('light');
											isDarkMode(false);
										} else {
											window.localStorage.setItem('theme', 'dark');
											element.classList.remove('light');
											element.classList.toggle('dark');
											isDarkMode(true);
										}
									}}
								>
									<Icon />
								</Button>
							</Navbar.Item>
						</Navbar.Content>
					</Navbar>
				</Layout>
			</div>

			<div id='nav-mobile'>
				<Layout id='nav-mobile'>
					<Navbar isBordered variant='static'>
						<Navbar.Brand>
							<Navbar.Toggle aria-label='toggle navigation' />
							<AcmeLogo /> <Badge color='primary' title='Esta es una versión de prueba, no es la versión final. Los servidores se caerán a menudo y la página puede contener errores.'>Beta</Badge>
							<Text b color='inherit' hideIn='xs'>
								Traductor 
							</Text>
						</Navbar.Brand>
						<Navbar.Content
							enableCursorHighlight
							hideIn='xs'
							variant='underline'
						>
							<Navbar.Link isActive href='#'>
								Inicio
							</Navbar.Link>
							<Navbar.Link
								href='https://github.com/martinval11/Traductor'
								target='_blank'
								rel='noopener noreferrer'
							>
								GitHub
							</Navbar.Link>
							<Navbar.Link
								href='https://www.isitdownrightnow.com/libretranslate.de.html'
								target='_blank'
								rel='noopener noreferrer'
							>
								Estado del servicio
							</Navbar.Link>
						</Navbar.Content>
						<Navbar.Content>
							<Navbar.Item>
								<Button
									id='darkmode-btn'
									auto
									gradient
									light
									onPress={() => {
										let element = document.body;
										if (darkMode !== false) {
											window.localStorage.setItem('theme', 'light');
											element.classList.remove('dark');
											element.classList.toggle('light');
											isDarkMode(false);
										} else {
											window.localStorage.setItem('theme', 'dark');
											element.classList.remove('light');
											element.classList.toggle('dark');
											isDarkMode(true);
										}
									}}
								>
									<Icon />
								</Button>
							</Navbar.Item>
						</Navbar.Content>
						<Navbar.Collapse>
							<Navbar.CollapseItem>
								<Link
									color='inherit'
									css={{
										minWidth: '100%',
									}}
									href='#'
								>
									Inicio
								</Link>
							</Navbar.CollapseItem>

							<Navbar.CollapseItem>
								<Link
									color='inherit'
									css={{
										minWidth: '100%',
									}}
									href='https://github.com/martinval11/Traductor'
									target='_blank'
									rel='noopener noreferrer'
								>
									GitHub
								</Link>
							</Navbar.CollapseItem>

							<Navbar.CollapseItem>
								<Link
									color='inherit'
									css={{
										minWidth: '100%',
									}}
									href='https://www.isitdownrightnow.com/libretranslate.de.html'
									target='_blank'
									rel='noopener noreferrer'
								>
									Estado del servicio
								</Link>
							</Navbar.CollapseItem>
						</Navbar.Collapse>
					</Navbar>
				</Layout>
			</div>
		</>
	);
};

export default Nav;
