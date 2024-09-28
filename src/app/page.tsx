"use client"

import { FormModal } from "@/components/FormModal";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import api from '../services/api'

const Page = () => {

  const [open, setOpen] = useState(false)

  type user = {
    id: string,
    name: string,
    email: string
  }

  const [users, setUsers] = useState<user[]>([])



  const getUsers = async () => {
    const usersApi = await api.get('/usuarios')
    setUsers(usersApi.data)
  }

  const deleteUser = async (id: string) => {
    await api.delete(`/usuarios/${id}`)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return(
    <main className="flex flex-col items-center justify-center gap-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Nome</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-300 flex gap-2">
                <div className="bg-yellow-400 p-1 rounded-md cursor-pointer"><MdEdit/></div>
                <div className="bg-red-400 p-1 rounded-md cursor-pointer" onClick={() => deleteUser(user.id)}>
                  <MdDelete />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-green-700 text-white p-2 rounded-lg mx-auto" onClick={() => setOpen(true)}>Adicionar User</button>

      <FormModal open={open} setOpen={setOpen}/>
    </main>
  )
}

export default Page