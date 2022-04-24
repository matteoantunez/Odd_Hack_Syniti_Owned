CREATE TABLE recents (
    ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
    display_name TEXT,
    bundle_identifier TEXT,
    sending_address TEXT,
    original_source TEXT,

    dates TEXT NOT NULL,
    last_date INTEGER,
    weight FLOAT,
    
    /* A compounded hash of all contacts belonging to this recent record. */
    record_hash TEXT NOT NULL,
    
    count INTEGER,

    group_kind INTEGER
);

CREATE TABLE contacts (
    ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
    
    recent_id INTEGER,

    display_name TEXT,
    kind TEXT,
    address TEXT,
    
    FOREIGN KEY (recent_id) REFERENCES recents (ROWID) ON DELETE CASCADE
);

CREATE TABLE metadata (
    ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
    
    recent_id INTEGER,
    key TEXT,
    value,
    
    FOREIGN KEY (recent_id) REFERENCES recents (ROWID) ON DELETE CASCADE,
    UNIQUE (recent_id, key)
);

CREATE INDEX contacts_recentsidx ON contacts(recent_id);
CREATE INDEX contacts_address ON contacts(kind, display_name, address);

CREATE INDEX recents_record_hash ON recents(record_hash);
CREATE INDEX recents_expunge ON recents(bundle_identifier, last_date DESC);

CREATE INDEX metadata_recents ON metadata(recent_id);

CREATE TABLE properties (ROWID INTEGER PRIMARY KEY,
    key,
    value,
    UNIQUE (key)
);
