import { Container, Header, HeaderDetails } from "./styles"


import { uploads } from "../../utils/config"

//components

import { Message } from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

//hooks
import { useState , useEffect , useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

//redux
import { getUserDetails } from "../../slices/userSlice"




export const Profile = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const { user , loading } = useSelector((state) => state.user)
    const { user : userAuth } = useSelector((state) => state.auth)

    //Photo

    //Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <Container>
            <Header>
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt="" />
                )}

                <HeaderDetails>
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </HeaderDetails>

                   

            </Header>
        </Container>
    )
}