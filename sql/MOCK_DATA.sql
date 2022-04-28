USE [SwapKeep];
GO

insert into UserProfile (FirebaseUserId, Name, UserName, Email, DesiredItems, ZipCode) values ('1', 'Ariella Jimeno', 'ajimeno0', 'ajimeno0@so-net.ne.jp', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 12345);
insert into UserProfile (FirebaseUserId, Name, UserName, Email, DesiredItems, ZipCode) values ('2', 'Dmitri Dabrowski', 'ddabrowski1', 'ddabrowski1@jiathis.com', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 12345);
insert into UserProfile (FirebaseUserId, Name, UserName, Email, DesiredItems, ZipCode) values ('3', 'Abbe Fortescue', 'afortescue2', 'afortescue2@exblog.jp', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 12345);
insert into UserProfile (FirebaseUserId, Name, UserName, Email, DesiredItems, ZipCode) values ('4', 'Sayers Watkiss', 'swatkiss3', 'swatkiss3@ebay.com', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 12345);
insert into UserProfile (FirebaseUserId, Name, UserName, Email, DesiredItems, ZipCode) values ('5', 'Viviyan Flory', 'vflory4', 'vflory4@uiuc.edu', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 12345);

insert into Item (Name, CategoryId, ImageUrl, UserId, Description, condition, Available) values ('Basketball', 1, 'http://dummyimage.com/165x100.png/dddddd/000000', 1, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, 'true');
insert into Item (Name, CategoryId, ImageUrl, UserId, Description, condition, Available) values ('IPod Nano', 2, 'http://dummyimage.com/115x100.png/cc0000/ffffff', 2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 2, 'true');
insert into Item (Name, CategoryId, ImageUrl, UserId, Description, condition, Available) values ('Collectors Mug', 3, 'http://dummyimage.com/231x100.png/ff4444/ffffff', 3, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 3, 'false');
insert into Item (Name, CategoryId, ImageUrl, UserId, Description, condition, Available) values ('Lazy Boy', 4, 'http://dummyimage.com/156x100.png/cc0000/ffffff', 4, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 4, 'true');
insert into Item (Name, CategoryId, ImageUrl, UserId, Description, condition, Available) values ('Hitchikers Guide To The Galaxy', 5, 'http://dummyimage.com/171x100.png/cc0000/ffffff', 5, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 5, 'false');

insert into Category (Name) values ('Sports Equipment');
insert into Category (Name) values ('Electronics');
insert into Category (Name) values ('Kitchen');
insert into Category (Name) values ('Furniture');
insert into Category (Name) values ('Books');

insert into ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId) values (1, 2, 1);
insert into ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId) values (2, 3, 2);
insert into ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId) values (3, 4, 1);
insert into ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId) values (4, 5, 2);
insert into ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId) values (1, 5, 1);

insert into Status (Name) values ('Open');
insert into Status (Name) values ('Closed');
