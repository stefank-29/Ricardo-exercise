import MessageStyles from '../styles/MessageStyles';
import ButtonStyles from '../styles/ButtonStyles';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Message({
    header,
    info,
    imageUrl = null,
    buttonText,
    buttonRoute,
}) {
    const router = useRouter();
    return (
        <MessageStyles>
            <p className="header">{header}</p>
            {imageUrl && (
                <div className="image">
                    <Image src={imageUrl} layout="fill" alt="message photo" />
                </div>
            )}
            <p className="info">{info}</p>
            <ButtonStyles onClick={() => router.push(buttonRoute)}>
                {buttonText}
            </ButtonStyles>
        </MessageStyles>
    );
}
