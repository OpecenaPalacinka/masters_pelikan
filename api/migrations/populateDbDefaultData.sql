INSERT INTO public.roles (role_id, name) VALUES (1, 'admin');
INSERT INTO public.roles (role_id, name) VALUES (2, 'user');

INSERT INTO public.users (user_id, firstname, lastname, email, password, role_id, registred) VALUES (13, 'User', 'Prázdný', 'user-empty@pelikan.cz', '$argon2id$v=19$m=65536,t=3,p=4$/DO+kVvAM+li3nUkvxNzTg$YUmWXonjNQVd88OPdAl4+/Wm6f6fjmKqLeVpcf8L4RM', 2, '2024-04-20 17:55:39.984596');
INSERT INTO public.users (user_id, firstname, lastname, email, password, role_id, registred) VALUES (14, 'User', 'Plný', 'user-full@pelikan.cz', '$argon2id$v=19$m=65536,t=3,p=4$f3DLD6hJRP2w5dovxqh8hw$defWdHg9eEIF81HMEcnfbJR8eMHtWvN/NgOdKpy3BPw', 2, '2024-04-20 17:55:58.726080');
INSERT INTO public.users (user_id, firstname, lastname, email, password, role_id, registred) VALUES (12, 'Admin', 'Plný', 'admin-full@pelikan.cz', '$argon2id$v=19$m=65536,t=3,p=4$3HCPa3pcdDGCoOrOVGz8iA$Ui3DuHvfF+cRfz4194uKfogtL1Hrd4xFd/DeIhfiAS0', 1, '2024-04-20 17:55:18.908685');
INSERT INTO public.users (user_id, firstname, lastname, email, password, role_id, registred) VALUES (11, 'Admin', 'Prázdný', 'admin-empty@pelikan.cz', '$argon2id$v=19$m=65536,t=3,p=4$NZZXHVhCbPVr7MNmzthUkw$jhLYFjQuf7AB/huyYoRChlm+p53n+UEt9bsG8msS3cM', 1, '2024-04-20 17:54:58.430746');

INSERT INTO public.causality_types (causality_types_id, name) VALUES (2, 'entailed');
INSERT INTO public.causality_types (causality_types_id, name) VALUES (3, 'involved');
INSERT INTO public.causality_types (causality_types_id, name) VALUES (5, 'pre-requisite for');
INSERT INTO public.causality_types (causality_types_id, name) VALUES (6, 'supported');
INSERT INTO public.causality_types (causality_types_id, name) VALUES (1, 'enabled');
INSERT INTO public.causality_types (causality_types_id, name) VALUES (4, 'Led to');

INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (10, 'Research stay', 2, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (8, 'Formal approval of an application or asset', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (6, 'Execution of a long-term research activity', 2, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (9, 'Attendance to an event', 2, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (11, 'Change of thesis (title, research questions or hypotheses)', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (7, 'Encounter (involving discussion) with a person', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (3, 'Other admin event', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (5, 'Creation of an intangible or tangible asset', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (4, 'Acquisition of knowledge /skills', 2, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (2, 'Start or end of a formal affiliation with an organization', 1, null, false, null);
INSERT INTO public.event_types (event_type_id, name, duration, user_id, custom, accepted) VALUES (1, 'Unclassified', 1, null, false, null);

INSERT INTO public.sentiment (sentiment_id, name) VALUES (2, 'neutral');
INSERT INTO public.sentiment (sentiment_id, name) VALUES (3, 'negative');
INSERT INTO public.sentiment (sentiment_id, name) VALUES (1, 'positive');

INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (23, 12, '2024-04-21 12:00:00.000000', null, 'I encounter my supervisor and we talked about all stuff', 'Enc. with supervisor', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (10, 12, '2024-04-22 12:00:00.000000', null, 'I created a tangible asset that is good', 'Tangible asset', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (15, 12, '2024-05-23 12:00:00.000000', '2024-06-12 12:00:00.000000', 'I was learning new skills', 'Skill increase', 2);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (21, 12, '2024-04-17 12:00:00.000000', '2024-05-12 12:00:00.000000', 'I visited a super conference in Prague', 'Conference', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (20, 12, '2024-07-11 12:00:00.000000', '2024-04-12 12:00:00.000000', 'Another conference, now in Berlin', 'Next Conference', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (18, 12, '2024-02-02 12:00:00.000000', null, 'I had another meeting with my supervisor', 'Meet with super', 3);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (17, 12, '2024-01-02 12:00:00.000000', '2024-01-10 12:00:00.000000', 'I was preparing a research strategy', 'Research', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (16, 12, '2024-10-17 12:00:00.000000', null, 'Created an intangible asset that is really good', 'Intangible', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (22, 12, '2024-09-25 12:00:00.000000', '2024-12-12 12:00:00.000000', 'I stayed in Pilsen for a long research stay', 'Research stay', 3);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (12, 12, '2024-12-11 12:00:00.000000', null, 'This is unclassified, no good event type', 'Not great type', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (7, 14, '2024-06-18 12:00:00.000000', null, 'Next one intangible super great asset', 'Short asset', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (9, 12, '2024-04-12 12:00:00.000000', '2024-04-20 12:00:00.000000', 'I attended a great event somewhere', 'Event somewhere', 3);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (14, 12, '2024-06-12 12:00:00.000000', '2024-09-12 12:00:00.000000', 'I executed a really long research stay', 'Stay', 3);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (13, 12, '2022-06-11 12:00:00.000000', null, 'Started studying at university', 'Start study', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (6, 14, '2024-05-11 12:00:00.000000', null, 'Next tangible asset for this work', 'Work tangible asset', 2);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (8, 14, '2024-04-11 12:00:00.000000', null, 'Update of tangible asset', 'up. tangible', 1);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (11, 12, '2024-04-13 12:00:00.000000', '2024-09-12 12:00:00.000000', 'I studied new subject', 'IT subject', 2);
INSERT INTO public.events (event_id, user_id, happened, ended, description, label, sentiment_id) VALUES (19, 12, '2024-08-11 12:00:00.000000', null, 'I got formal approval on my thesis', 'Thesis done', 2);

INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (6, 6, 5);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (7, 7, 5);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (8, 8, 5);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (9, 9, 9);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (10, 10, 5);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (11, 11, 4);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (27, 12, 1);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (28, 13, 2);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (29, 14, 6);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (30, 15, 4);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (31, 16, 5);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (32, 17, 6);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (33, 18, 7);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (34, 19, 8);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (35, 20, 9);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (36, 21, 9);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (37, 22, 10);
INSERT INTO public.events_to_types (events_to_types_id, event_id, event_type_id) VALUES (38, 23, 7);

INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (23, 9, 2, 10, null);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (24, 9, 1, null, 11);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (25, 9, 3, 15, null);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (26, 10, 4, null, 12);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (27, 19, 5, 12, null);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (28, 18, 6, 21, null);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (29, 17, 3, null, 16);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (30, 16, 2, null, 14);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (31, 20, 1, 13, null);
INSERT INTO public.causalities (causality_id, event_id, causality_type_id, antecedent, succedent) VALUES (32, 22, 4, null, 16);


INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (9, 4, 1, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (10, 4, 2, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (13, 4, 3, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (14, 4, 2, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (18, 4, 3, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (19, 4, 3, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (20, 4, 3, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (23, 4, 2, 1, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (16, 4, 5, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (25, 4, 7, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (22, 4, 5, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (17, 4, 5, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (24, 4, 6, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (21, 4, 4, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (12, 4, 4, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (11, 4, 3, 2, 11);
INSERT INTO public.antecedents_succedents (id, event_type_id, related_type_id, relationship, event_id) VALUES (15, 4, 4, 2, 11);
