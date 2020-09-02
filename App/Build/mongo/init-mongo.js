db.createUser({
    user : "root",
    pwd : "ricoMG@77",
    roles : [
        {
            role : "readWrite",
            db : "ag_data"
        }
    ]
})