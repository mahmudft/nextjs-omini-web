

export default async function Chat({params}: {params: {id: number}}){
    return (
        <div>
            {params.id}
        </div>
    )
}