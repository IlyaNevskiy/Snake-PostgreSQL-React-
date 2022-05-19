
create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE score(
    id SERIAL PRIMARY KEY,
    count INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);