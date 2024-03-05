package com.example.hipzip.config.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidator implements ConstraintValidator<EnumValue, String> {
    private EnumValue enumValue;

    @Override
    public void initialize(final EnumValue constraintAnnotation) {
        enumValue = constraintAnnotation;
    }

    @Override
    public boolean isValid(final String value, final ConstraintValidatorContext context) {
        Enum<?>[] enumConstants = enumValue.enumClass().getEnumConstants();
        if (value == null || enumConstants == null) {
            return false;
        }

        for (Enum<?> enumConstant : enumConstants) {
            if (value.equals(enumConstant.name()) ||
                    enumValue.ignoreCase() && value.equalsIgnoreCase(enumConstant.name())
            ) {
                return true;
            }
        }

        return false;
    }
}
