import { Container} from './styles'

import { uploads } from '../../utils/config'
import { Link } from 'react-router-dom'


export const PhotoItem = ({photo}) => {


    return (
        <Container>
            {photo.image && (
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
            )}

            <h2>{photo.title}</h2>
            <p className='photo-author'>
                Publicado por: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link> 
            </p>
        </Container>
    )


}