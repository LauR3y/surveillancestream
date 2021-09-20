import { useMutation, gql } from '@apollo/client'
import React, { useState } from 'react'
import QUERY_CAMERA_LIST from '../Queries/CameraList'

interface IFormData {
  name: string
  host: string
  username: string
  password: string
  port: string
}

const FormAdd = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<IFormData>({ name: '', host: '', password: '', username: '', port: '' })

  const onChangeName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }

  const onChangeHost= (e) => {
    setFormData({
      ...formData,
      host: e.target.value,
    })
  }

  const onChangeUsername = (e) => {
    setFormData({
      ...formData,
      username: e.target.value,
    })
  }

  const onChangePassword = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    })
  }

  const onChangePort = (e) => {
    setFormData({
      ...formData,
      port: e.target.value,
    })
  }

  const mutation= gql`
    mutation createCamera($name: String!, $host: String!, $username: String!, $password: String!, $port: String!) {
      createCamera(name: $name, host: $host, username: $username, password: $password, port: $port) {
        id
      }
    }
  `;
  
  const [createCameraMutation] = useMutation(mutation, {
    refetchQueries: [
      QUERY_CAMERA_LIST,
    ],
  })

  const onSubmit = (e) => {
    e.preventDefault();

    createCameraMutation({ variables: formData }).then(({ data }) => {
      if (data && data.createCamera.id) {
        onClose()
      }
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div>
          <label>name
            <input type="text" name="name" value={formData.name} onChange={onChangeName} />
          </label>
        </div>
        <div>
          <label>host
            <input type="text" name="host" value={formData.host} onChange={onChangeHost} />
          </label>
        </div>
        <div>
          <label>username
            <input type="text" name="username" value={formData.username} onChange={onChangeUsername} />
          </label>
        </div>
        <div>
          <label>password
            <input type="text" name="password" value={formData.password} onChange={onChangePassword} />
          </label>
        </div>
        <div>
          <label>port
            <input type="text" name="password" value={formData.port} onChange={onChangePort} />
          </label>
        </div>
        <input type="submit" value="Submit" />
        <input type="button" value="Cancel" onClick={onClose} />
      </form>
    </div>
  )
}

export default FormAdd;
