create table regTowns (
    id serial not null primary key,
    name text not null,
    begin text not null
);
create table registration(
    id serial not null primary key,
    theReg text not null,
    id_town int not null,
    foreign key (id_town) references registration(id)
);
insert into regTowns(name,begin) values ('Cape Town', 'CA');
insert into regTowns(name,begin) values ('Parow', 'CY');
insert into regTowns(name,begin) values ('Stellenbosch', 'CW');
