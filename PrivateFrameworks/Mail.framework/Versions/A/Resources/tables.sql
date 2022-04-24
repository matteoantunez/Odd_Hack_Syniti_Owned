CREATE TABLE IF NOT EXISTS ews_folders (ROWID INTEGER PRIMARY KEY, folder_id TEXT UNIQUE ON CONFLICT REPLACE, mailbox_id INTEGER NOT NULL UNIQUE ON CONFLICT REPLACE REFERENCES mailboxes(ROWID) ON DELETE CASCADE, sync_state TEXT);
CREATE INDEX IF NOT EXISTS ews_folders_mailbox_id_index ON ews_folders(mailbox_id);

CREATE TABLE IF NOT EXISTS duplicates_unread_count (ROWID INTEGER PRIMARY KEY, message_id INTEGER NOT NULL, mailbox_id INTEGER NOT NULL REFERENCES mailboxes(ROWID) ON DELETE CASCADE, unread_count INTEGER DEFAULT 0, UNIQUE(message_id, mailbox_id));
CREATE INDEX IF NOT EXISTS duplicates_unread_count_mailbox_id_index ON duplicates_unread_count(mailbox_id);

CREATE TABLE IF NOT EXISTS events (ROWID INTEGER PRIMARY KEY AUTOINCREMENT, message_id INTEGER NOT NULL REFERENCES messages(ROWID) ON DELETE CASCADE, start_date INTEGER, end_date INTEGER, location TEXT, out_of_date INTEGER DEFAULT 0, processed INTEGER DEFAULT 0, is_all_day INTEGER DEFAULT 0, associated_id_string TEXT, original_receiving_account TEXT, ical_uid TEXT, is_response_requested INTEGER DEFAULT 0);
CREATE INDEX IF NOT EXISTS events_message_id_index ON events(message_id);

CREATE TABLE IF NOT EXISTS labels (message_id INTEGER REFERENCES messages(ROWID) ON DELETE CASCADE, mailbox_id INTEGER REFERENCES mailboxes(ROWID) ON DELETE CASCADE, PRIMARY KEY(message_id, mailbox_id)) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS labels_mailbox_id_index on labels(mailbox_id);

CREATE TABLE IF NOT EXISTS mailbox_actions (ROWID INTEGER PRIMARY KEY AUTOINCREMENT, account_identifier TEXT, action_type INTEGER, mailbox_name TEXT);
CREATE INDEX IF NOT EXISTS mailbox_actions_action_type_index ON mailbox_actions(action_type);

CREATE TABLE IF NOT EXISTS last_spotlight_check_date (message_id INTEGER NOT NULL UNIQUE ON CONFLICT REPLACE REFERENCES messages(ROWID) ON DELETE CASCADE, date INTEGER, PRIMARY KEY(message_id)) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS last_spotlight_check_date_message_id_date_index ON last_spotlight_check_date(message_id, date);

CREATE TRIGGER IF NOT EXISTS before_delete_message BEFORE DELETE ON messages
BEGIN
UPDATE duplicates_unread_count SET unread_count = unread_count - 1 WHERE (OLD.message_id != 0 AND duplicates_unread_count.message_id = OLD.message_id AND duplicates_unread_count.mailbox_id = OLD.mailbox) AND (OLD.flags&1 = 0 AND OLD.flags&2 = 0);
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MAX(MIN(1, unread_count), unread_count_adjusted_for_duplicates - 1) WHERE ((mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL AND OLD.message_id = 0) OR (mailboxes.source NOTNULL AND mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND ((mailboxes.source = OLD.mailbox AND OLD.message_id = 0) OR ((SELECT count() FROM labels WHERE message_id IN (SELECT ROWID FROM messages WHERE message_id = OLD.message_id) AND mailbox_id = mailboxes.ROWID) = 0 AND OLD.message_id != 0)))) AND (OLD.flags&1 = 0 AND OLD.flags&2 = 0);

UPDATE mailboxes SET unread_count = MAX(0, unread_count - 1), unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates, unread_count - 1) WHERE ((mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND mailboxes.source = OLD.mailbox)) AND (OLD.flags&1 = 0 AND OLD.flags&2 = 0);

UPDATE mailboxes SET total_count = MAX(0, total_count - 1) WHERE (mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND mailboxes.source = OLD.mailbox);
UPDATE mailboxes SET unseen_count = MAX(0, unseen_count - 1) WHERE (mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL AND OLD.flags&1 = 0) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND mailboxes.source = OLD.mailbox AND OLD.flags&1 = 0);
UPDATE mailboxes SET deleted_count = MAX(0, deleted_count - 1) WHERE (mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL AND OLD.flags&2 != 0) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND mailboxes.source = OLD.mailbox AND OLD.flags&2 != 0);
END;

CREATE TRIGGER IF NOT EXISTS after_delete_message AFTER DELETE ON messages
BEGIN
DELETE FROM subjects WHERE ROWID = OLD.subject AND (SELECT COUNT() FROM messages WHERE subject = OLD.subject LIMIT 1) = 0;
DELETE FROM message_global_data WHERE ROWID = OLD.global_message_id AND (SELECT COUNT() FROM messages WHERE global_message_id = OLD.global_message_id LIMIT 1) = 0;
DELETE FROM addresses WHERE ROWID = OLD.sender AND ((SELECT COUNT() FROM messages WHERE sender = OLD.sender LIMIT 1) = 0) AND ((SELECT COUNT() FROM recipients WHERE address = OLD.sender LIMIT 1) = 0);
DELETE FROM summaries WHERE ROWID = OLD.summary AND (SELECT COUNT() FROM messages WHERE summary = OLD.summary LIMIT 1) = 0;

UPDATE messages SET fuzzy_ancestor = -1 WHERE messages.fuzzy_ancestor = OLD.ROWID;
END;

CREATE TRIGGER IF NOT EXISTS after_insert_message AFTER INSERT ON messages
BEGIN
UPDATE mailboxes SET total_count = total_count + 1 WHERE (mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox);
UPDATE mailboxes SET unseen_count = unseen_count + 1 WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND NEW.flags&1 = 0;
UPDATE mailboxes SET deleted_count = deleted_count + 1 WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND NEW.flags&2 != 0;
END;

CREATE TRIGGER IF NOT EXISTS after_insert_message_unread AFTER INSERT ON messages WHEN (NEW.flags&1 = 0 AND NEW.flags&2 = 0)
BEGIN
UPDATE mailboxes SET unread_count = unread_count + 1 WHERE (mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox);

INSERT OR IGNORE INTO duplicates_unread_count (message_id, mailbox_id) VALUES (NULLIF(NEW.message_id, 0), NEW.mailbox);
UPDATE duplicates_unread_count SET unread_count = unread_count + 1 WHERE NEW.message_id != 0 AND duplicates_unread_count.message_id = NEW.message_id AND duplicates_unread_count.mailbox_id = NEW.mailbox;
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates + 1, unread_count) WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND NEW.message_id = 0;
END;

CREATE TRIGGER IF NOT EXISTS after_update_message AFTER UPDATE OF flags ON messages
BEGIN
UPDATE mailboxes SET unseen_count = MAX(0, unseen_count - 1) WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND OLD.flags&1 = 0 AND NEW.flags&1 != 0;
UPDATE mailboxes SET deleted_count = MAX(0, deleted_count - 1) WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND OLD.flags&2 != 0 AND NEW.flags&2 = 0;

UPDATE mailboxes SET unseen_count = unseen_count + 1 WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND OLD.flags&1 != 0 AND NEW.flags&1 = 0;
UPDATE mailboxes SET deleted_count = deleted_count + 1 WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND OLD.flags&2 = 0 AND NEW.flags&2 != 0;
END;

CREATE TRIGGER IF NOT EXISTS after_update_message_becoming_read AFTER UPDATE OF flags ON messages WHEN (OLD.flags&1 = 0 AND OLD.flags&2 = 0) AND (NEW.flags&1 != 0 OR NEW.flags&2 != 0)
BEGIN
UPDATE duplicates_unread_count SET unread_count = unread_count - 1 WHERE OLD.message_id != 0 AND duplicates_unread_count.message_id = OLD.message_id AND duplicates_unread_count.mailbox_id = OLD.mailbox;
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MAX(MIN(1, unread_count), unread_count_adjusted_for_duplicates - 1) WHERE ((mailboxes.ROWID = OLD.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = OLD.ROWID) AND mailboxes.source = OLD.mailbox)) AND OLD.message_id = 0;

UPDATE mailboxes SET unread_count = MAX(0, unread_count - 1), unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates, unread_count - 1) WHERE (mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox);
END;

CREATE TRIGGER IF NOT EXISTS after_update_message_becoming_unread AFTER UPDATE OF flags ON messages WHEN (OLD.flags&1 != 0 OR OLD.flags&2 != 0) AND (NEW.flags&1 = 0 AND NEW.flags&2 = 0)
BEGIN
UPDATE mailboxes SET unread_count = unread_count + 1 WHERE (mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox);

INSERT OR IGNORE INTO duplicates_unread_count (message_id, mailbox_id) VALUES (NULLIF(NEW.message_id, 0), NEW.mailbox);
UPDATE duplicates_unread_count SET unread_count = unread_count + 1 WHERE NEW.message_id != 0 AND duplicates_unread_count.message_id = NEW.message_id AND duplicates_unread_count.mailbox_id = NEW.mailbox;
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates + 1, unread_count) WHERE ((mailboxes.ROWID = NEW.mailbox AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id = NEW.ROWID) AND mailboxes.source = NEW.mailbox)) AND NEW.message_id = 0;
END;

CREATE TRIGGER IF NOT EXISTS after_update_duplicates_unread_count_becoming_unread AFTER UPDATE OF unread_count ON duplicates_unread_count WHEN OLD.unread_count = 0 AND NEW.unread_count = 1
BEGIN
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates + 1, unread_count) WHERE (mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id IN (SELECT ROWID FROM messages WHERE message_id = NEW.message_id AND mailbox = NEW.mailbox_id)) AND mailboxes.source = NEW.mailbox_id);
END;

CREATE TRIGGER IF NOT EXISTS after_update_duplicates_unread_count_becoming_read AFTER UPDATE OF unread_count ON duplicates_unread_count WHEN OLD.unread_count = 1 AND NEW.unread_count = 0
BEGIN
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MAX(MIN(1, unread_count), unread_count_adjusted_for_duplicates - 1) WHERE (mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source ISNULL) OR (mailboxes.ROWID IN (SELECT mailbox_id FROM labels WHERE message_id IN (SELECT ROWID FROM messages WHERE message_id = NEW.message_id AND mailbox = NEW.mailbox_id)) AND mailboxes.source = NEW.mailbox_id);

DELETE FROM duplicates_unread_count WHERE rowid = NEW.rowid;
END;

CREATE TRIGGER IF NOT EXISTS after_insert_label AFTER INSERT ON labels
BEGIN
UPDATE mailboxes SET total_count = total_count + 1 WHERE mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = NEW.message_id LIMIT 1);
UPDATE mailboxes SET unseen_count = unseen_count + 1 WHERE mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = NEW.message_id AND flags&1 = 0 LIMIT 1);
UPDATE mailboxes SET deleted_count = deleted_count + 1 WHERE mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = NEW.message_id AND flags&2 != 0 LIMIT 1);
UPDATE mailboxes SET unread_count = unread_count + 1 WHERE mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = NEW.message_id AND flags&1 = 0 AND flags&2 = 0 LIMIT 1);
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates + 1, unread_count) WHERE mailboxes.ROWID = NEW.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = NEW.message_id AND flags&1 = 0 AND flags&2 = 0 LIMIT 1) AND (SELECT count() FROM labels WHERE message_id IN (SELECT ROWID FROM messages WHERE message_id IN (SELECT NULLIF(message_id, 0) FROM messages WHERE ROWID = NEW.message_id) AND ROWID != NEW.message_id) AND mailbox_id = NEW.mailbox_id) = 0;
END;

CREATE TRIGGER IF NOT EXISTS after_delete_label AFTER DELETE ON labels
BEGIN
UPDATE mailboxes SET total_count = MAX(0, total_count - 1) WHERE mailboxes.ROWID = OLD.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = OLD.message_id LIMIT 1);
UPDATE mailboxes SET unseen_count = MAX(0, unseen_count - 1) WHERE mailboxes.ROWID = OLD.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = OLD.message_id AND flags&1 = 0 LIMIT 1);
UPDATE mailboxes SET deleted_count = MAX(0, deleted_count - 1) WHERE mailboxes.ROWID = OLD.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = OLD.message_id AND flags&2 != 0 LIMIT 1);
UPDATE mailboxes SET unread_count_adjusted_for_duplicates = MAX(MIN(1, unread_count), unread_count_adjusted_for_duplicates - 1) WHERE mailboxes.ROWID = OLD.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = OLD.message_id AND flags&1 = 0 AND flags&2 = 0 LIMIT 1) AND (SELECT count() FROM labels WHERE message_id IN (SELECT ROWID FROM messages WHERE message_id IN (SELECT NULLIF(message_id, 0) FROM messages WHERE ROWID = OLD.message_id) AND ROWID != OLD.message_id) AND mailbox_id = OLD.mailbox_id) = 0;
UPDATE mailboxes SET unread_count = MAX(0, unread_count - 1), unread_count_adjusted_for_duplicates = MIN(unread_count_adjusted_for_duplicates, unread_count - 1) WHERE mailboxes.ROWID = OLD.mailbox_id AND mailboxes.source IN (SELECT mailbox FROM messages WHERE ROWID = OLD.message_id AND flags&1 = 0 AND flags&2 = 0 LIMIT 1);
END;

CREATE TABLE IF NOT EXISTS properties (ROWID INTEGER PRIMARY KEY, key, value, UNIQUE (key));
