create table regTowns (
    begin char(2) not null primary key,
    name text not null
     
);
create table registration(
    id serial not null primary key,
    theReg text not null,
    id_town char(2) not null,
    foreign key (id_town) references regTowns(begin)
);
insert into regTowns(begin,name) values ('Cape Town', 'CA');
insert into regTowns(begin,name) values ('Parow', 'CY');
insert into regTowns(begin,name) values ('Stellenbosch', 'CW');
alter table regTowns add constraint uniq_desc_constraint unique(begin);