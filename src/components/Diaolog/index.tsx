import { PropsWithChildren, useEffect, useRef } from 'react';
import './styles.css';

type DiaologProps = {
	onClose: () => void,
};


const Diaolog = ( {children, open, onClose, "aria-describedby": ariaDescribedby, "aria-label": ariaLabel}: DiaologProps & React.DialogHTMLAttributes<PropsWithChildren>): JSX.Element => {
	const dialogRef = useRef(null);

	useEffect(() => {
		if(open)
			(dialogRef.current! as HTMLDialogElement).showModal();
		else
			(dialogRef.current! as HTMLDialogElement).close();

	}, [open])

	return (
		<dialog className='dialog' ref={dialogRef} aria-describedby={ariaDescribedby} aria-label={ariaLabel}>
			{children}
		</dialog>
	);
}

export default Diaolog;