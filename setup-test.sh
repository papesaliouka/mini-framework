#!/bin/bash

# Define the tests directory
TESTS_DIR="tests"

# Create subdirectories for tests
mkdir -p $TESTS_DIR/dom
mkdir -p $TESTS_DIR/events
mkdir -p $TESTS_DIR/templating
mkdir -p $TESTS_DIR/state
mkdir -p $TESTS_DIR/components

# Create and initialize test files
# DOM Tests
echo "import { createElement } from '../../src/core/dom/createElement';" > $TESTS_DIR/dom/createElement.test.js
echo "import { updateElement } from '../../src/core/dom/updateElement';" > $TESTS_DIR/dom/updateElement.test.js

# Event Tests
echo "import { manageEvent } from '../../src/core/events/manageEvent';" > $TESTS_DIR/events/manageEvent.test.js

# Templating Engine Tests
echo "import TemplatingEngine from '../../src/core/templating/templatingEngine';" > $TESTS_DIR/templating/templatingEngine.test.js

# State Management Tests
echo "import StateManager from '../../src/core/state/StateManager';" > $TESTS_DIR/state/StateManager.test.js

# Component Tests
echo "import Component from '../../src/core/components/Component';" > $TESTS_DIR/components/Component.test.js

echo "Test files have been created in $TESTS_DIR"

