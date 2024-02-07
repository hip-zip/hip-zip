package com.example.hipzip;

import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

public class DatabaseClearExtension implements BeforeEachCallback {

    @Override
    public void beforeEach(final ExtensionContext context) {
        DatabaseCleaner databaseCleaner = SpringExtension.getApplicationContext(context)
                .getBean(DatabaseCleaner.class);
        databaseCleaner.truncate();
    }
}
