import { Text, Spacer } from '@nextui-org/react';
import { Box } from './Box.js';

export const Content = () => (
	<Box css={{ px: '$12', mt: '$8', '@xsMax': { px: '$10' } }}>
		<div id='contain'>
			<h1 className='title'>Traductor</h1>

			<p className='description'>
				Un Traductor para tus actividades escolares{' '}
			</p>
		</div>
	</Box>
);
