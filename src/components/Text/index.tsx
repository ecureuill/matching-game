import { PropsWithChildren } from 'react';
import './styles.css'

type TextProps = {
	type: 'body' | 'title' | 'subtitle' | 'label'
};

const Text = ( {id, className, type, children}: PropsWithChildren<TextProps> & React.BaseHTMLAttributes<Element>): JSX.Element => {
	return (
		<span  id={id} className={`text -${type} ${className !== undefined? className : '' }`}>
			{children}
		</span>
	);
}

export default Text;