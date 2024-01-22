package com.example.hipzip;

import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit.jupiter.SpringExtension;

public class DatabaseClearExtension implements BeforeEachCallback {

    @Override
    public void beforeEach(final ExtensionContext context) throws Exception {
        DatabaseCleaner databaseCleaner = SpringExtension.getApplicationContext(context)
                .getBean(DatabaseCleaner.class);
        databaseCleaner.truncate();
    }
}
