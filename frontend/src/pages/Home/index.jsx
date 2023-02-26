import styled from "styled-components";

import { LikeContainer } from "../../components/LikeContainer";
import {PhotoItem } from "../../components/PhotoItem";

import { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import { getPhotos, like} from '../../slices/photoSlice'

export function Home() {

  const dispatch = useDispatch()
  const resetMessage= useResetComponentMessage(dispatch)

  /* const {user} */
  return (
    <>
     


      <h1>Home Page</h1>
    </>
  );
}
