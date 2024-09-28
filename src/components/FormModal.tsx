'use client'

import { useRef } from "react"
import api from '../services/api'

type Props = {
    open: boolean,
    setOpen: (a: boolean) => void
}

export const FormModal = ({ open, setOpen }: Props) => {

    const inputName = useRef<string | undefined>()
    const inputEmail = useRef<string | undefined>()

    const createUser = async () => {
        await api.post('/usuarios', {
            name: inputName.current?.valueOf,
            email: inputEmail.current?.valueOf
        })
        setOpen(false)
    }

    return(
        <div className="absolute h-screen w-screen bg-black bg-opacity-80 flex justify-center items-center" style={{display: open === true ? 'flex' : 'none'}}>
            <div className="bg-white flex flex-col justify-center items-center gap-6 p-10 rounded-xl relative">
                <h2 className="text-xl">Adicionar/Editar Usuário</h2>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Digite um nome..." className="bg-gray-300 rounded-md p-2"/>
                    <input type="email" placeholder="Digite um email..." className="bg-gray-300 rounded-md p-2"/>
                    <button className="bg-blue-500 rounded-md text-white p-2" onClick={createUser}>Enviar dados</button>
                </form>

                <div className="text-red-600 cursor-pointer absolute top-2 right-3" onClick={() => setOpen(false)}>X</div>
            </div>
        </div>
    )
}