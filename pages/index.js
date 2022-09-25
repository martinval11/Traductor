import Head from 'next/head';
import { useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import Nav from '../components/Nav';
import Script from 'next/script';

import {
	Button,
	Spacer,
	Loading,
	Textarea,
	Text,
	Modal,
} from '@nextui-org/react';

import Footer from '../components/Footer';

const Home = () => {
	const [message, setMessage] = useState('');
	const [dataToTranslator, setDataToTranslator] = useState('');
	const [firstValue, setFirstValue] = useState('en');
	const [secondValue, setSecondValue] = useState('es');
	const [isShown, setIsShown] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleToEmptyChars, setVisibleToEmptyChars] = useState(false);

	const handleMessageChange = (event) => {
		// Capture the textarea value to translate it on the future.
		setMessage(event.target.value);
	};

	const translateDataOnServer = async (source, language) => {
		setIsShown((current) => !current);
		const res = await fetch('https://libretranslate.de/translate', {
			method: 'POST',
			body: JSON.stringify({
				q: message,
				source: source,
				target: language,
				format: 'text',
				api_key: '',
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		let data = await res.json();
		setDataToTranslator(data.translatedText);
		setIsShown(false);
	};

	const closeHandler = () => {
		setVisible(false);
	};

	const closeHandlerForEmptyChars = () => {
		setVisibleToEmptyChars(false);
	};

	const renderDataToClient = () => {
		if (message.length > 2000) {
			setVisible(true);
		} else if (message === '' || message.length === 0) {
			setVisibleToEmptyChars(true);
		} else {
			setVisible(false);
			setVisibleToEmptyChars(false);
			translateDataOnServer(firstValue, secondValue);
		}
	};

	const invertValues = () => {
		setFirstValue(secondValue);
		setSecondValue(firstValue);
	};

	/*const f = () => {
		const recognition = new webkitSpeechRecognition()
		recognition.lang = 'es-Es'
		recognition.continuous = true
		recognition.onresult = event => {
			for (const result of event.results) {
				console.log(result[0].transcrip)
			}
		}
		recognition.start()
	}*/

	return (
		<>
			<Nav />

			<Head>
				<title>Traductor</title>
				<meta
					name='description'
					content='Traduce textos rapidamente y con una interfaz limpia y minimalista'
				/>
				<meta
					name='keywords'
					content='Traductor, Traducir textos, Traducciones'
				/>
				<link rel='icon' href='/logo.png' />
				<link rel='canonnical' href='https://mitraductor.vercel.app' />
			</Head>

			<div className='container'>
				

				<main>
					<div className='grid'>
						<div>
							<div id='select-container'>
								<select
									onChange={(e) => setFirstValue(e.target.value)}
									value={firstValue}
								>
									<option value='en'>Inglés</option>
									<option value='es'>Español</option>
									<option value='pt'>Portugues</option>
									<option value='ru'>Ruso</option>
									<option value='ja'>Japones</option>
									<option value='de'>Alemán</option>
									<option value='fr'>Frances</option>
									<option value='it'>Italiano</option>
									<option value='zh'>Chino</option>
									<option value='ko'>Coreano</option>
									<option value='uk'>Ucraniano</option>
								</select>
							</div>
							<Spacer y={1.5} />

							<Textarea
								bordered
								color='primary'
								labelPlaceholder='Texto a traducir'
								cols='30'
								rows='10'
								value={message}
								onChange={handleMessageChange}
							></Textarea>
							<span id='chars-remaining'>{message.length}/2000</span>
						</div>

						<div id='invert-options-btn-container'>
							<Button
								id='invert-options-btn'
								title='Invertir'
								color='primary'
								auto
								onPress={() => invertValues()}
								flat
							>
								<ArrowLeftRight />
							</Button>
						</div>

						<div>
							<div id='select-container'>
								<select
									onChange={(e) => setSecondValue(e.target.value)}
									value={secondValue}
								>
									<option value='es'>Español</option>
									<option value='en'>Inglés</option>
									<option value='pt'>Portugues</option>
									<option value='ru'>Ruso</option>
									<option value='ja'>Japones</option>
									<option value='de'>Alemán</option>
									<option value='fr'>Frances</option>
									<option value='it'>Italiano</option>
									<option value='zh'>Chino</option>
									<option value='ko'>Coreano</option>
									<option value='uk'>Ucraniano</option>
								</select>
							</div>
							<Spacer y={1.5} />
							<Textarea
								bordered
								color='primary'
								labelPlaceholder='Texto traducido'
								cols='30'
								rows='10'
								readOnly
								value={dataToTranslator}
							></Textarea>
						</div>
					</div>
					<Spacer y={0.5} />
					<Button
						id='translate-btn'
						auto
						color='primary'
						onPress={() => renderDataToClient()}
						flat
					>
						{isShown && (
							<>
								<Loading type='points' color='currentColor' size='sm' />
								<span>Traduciendo...</span>
							</>
						)}

						{!isShown && (
							<>
								<span>Traducir</span>
							</>
						)}

						{visible && (
							<Modal
								closeButton
								aria-labelledby='modal-title'
								open={visible}
								onClose={closeHandler}
							>
								<Modal.Header>
									<Text id='modal-title' size={18}>
										No Puedes traducir más de{' '}
										<Text b size={18}>
											2000
										</Text>{' '}
										caracteres.
									</Text>
								</Modal.Header>
								<Modal.Footer>
									<Button auto flat color='error' onPress={closeHandler}>
										Cerrar
									</Button>
									<Button auto onPress={closeHandler}>
										Aceptar
									</Button>
								</Modal.Footer>
							</Modal>
						)}

						{visibleToEmptyChars && (
							<Modal
								closeButton
								aria-labelledby='modal-title'
								open={visibleToEmptyChars}
								onClose={closeHandlerForEmptyChars}
							>
								<Modal.Header>
									<Text id='modal-title' size={18}>
										No puedes traducir un texto vacio.
									</Text>
								</Modal.Header>
								<Modal.Footer>
									<Button
										auto
										flat
										color='error'
										onPress={() => closeHandlerForEmptyChars()}
									>
										Cerrar
									</Button>
									<Button auto onPress={() => closeHandlerForEmptyChars()}>
										Aceptar
									</Button>
								</Modal.Footer>
							</Modal>
						)}
					</Button>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Home;
