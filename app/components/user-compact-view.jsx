export default function UserCompactView({ user, isUser }) {
    return (
        <div className="w-full flex items-center gap-4 ">
            {/* <Avatar username={user.username} size={38} /> */}
            <div className={"flex flex-col items-start justify-center "}>
                <span className={"text-sm font-medium"}>
                    {user.username} {isUser && " (you)"}
                </span>
                <span className={"text-xs"}>{user.email}</span>
            </div>
        </div>
    );
};