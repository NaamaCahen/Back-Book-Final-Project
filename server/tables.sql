create table users(
	user_id SERIAL primary key,
	email varchar(100) unique not null,
	password varchar(50) not null,
	user_first_name varchar(30) not null,
	user_last_name varchar(50) not null,
	country varchar(50) not null,
	city varchar(50) not null,
	street varchar(70) not null,
	num_house varchar(30) not null,
	phone varchar(30) not null
)

create table books(
	book_id SERIAL primary key,
	title varchar(33) not null,
	author_first_name varchar(30) not null,
	athor_last_name varchar(30) not null,
	category integer references categories (category_id)  not null,
	book_status integer references books_status (status_id)  not null
	
)
alter table books add column age integer references ages(age_id) 

create table ages(
	age_id serial primary key,
	age_description varchar(50) not null
)

select * from books

create table categories(
	category_id serial primary key,
	category_name varchar(50) not null
)

create table books_status(
	status_id serial primary key,
	status_name varchar(30) not null
)

create table book_assigning(
	book_assigning_id serial primary key,
	user_id integer references users(user_id) not null,
	book_id integer references books(book_id) not null,
	status integer references assigning_status(status_id) not null,
	requestedAt date ,
	receivedAt date,
	sentAt date
)



create table assigning_status(
	status_id serial primary key,
	status_name varchar(30) not null
)


insert into categories(category_name)
values('science'),('thriller'),('roman'),('science fiction'),('textbook'),('poetry'),('prose'),('psychology'),('family'),('travels and excursions')

insert into ages(age_description)
values('toddler'),('children'),('teenagers'),('adults')

insert into books_status(status_name)
values('for sharing'),('reading')

insert into assigning_status(status_name)
values('request'),('received'),('given')