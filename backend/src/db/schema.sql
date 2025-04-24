create table tasks {
	id SERIAL primary key,
	name VARCHAR(255) not null,
	description TEXT not null,
	isImportant BOOLEAN default false,
	isCompleted BOOLEAN default false,
	dueDate DATE
};

create table users {
	id SERIAL primary key, 
	email VARCHAR(255) not null unique, 
	password_hash TEXT not null,
	created_at TIMESTAMP default CURRENT_TIMESTAMP
};

create table device_tokens {
	id SERIAL primary key,
	user_id INT not null references users(id) on delete cascade,
	device_token TEXT not null unique,
	created_at TIMESTAMP default CURRENT_TIMESTAMP
};


