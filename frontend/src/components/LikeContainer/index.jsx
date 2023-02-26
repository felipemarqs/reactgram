import { Container } from './styles'
import { BsHeart , BsHeartFill} from 'react-icons/bs'

export const LikeContainer = ({photo, user , handleLike}) => {
    return (
        <>
        <Container>
            { photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill/>
                    ) : (
                        <BsHeart onClick={() => handleLike(photo)}/>
                    )}
                    <p>{photo.likes.length} likes(s)</p>
                </>
            )}
        </Container>
        </>
    )
}