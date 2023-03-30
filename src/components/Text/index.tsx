import { PropsWithChildren } from 'react';
import './styles.css'

type TextProps = {
	type: 'body' | 'title' | 'subtitle' | 'label'
};

const Text = ( props: PropsWithChildren<TextProps> & React.BaseHTMLAttributes<Element>): JSX.Element => {
	return (
		<span  {...props} className={`text -${props.type} ${props.className !== undefined? props.className : '' }`}>
			{props.children}
		</span>
	);
}

export default Text;