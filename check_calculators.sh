#!/bin/bash

echo "Checking calculator data files vs imports..."
echo

# Get imported calculator names from calculatorEngine.ts
grep "import.*Data from" src/lib/calculatorEngine.ts | sed 's/.*import //' | sed 's/Data from.*//' | sort > imported.txt

# Get available calculator data files
ls src/data/calculators/*.json | sed 's|src/data/calculators/||' | sed 's|\.json||' | sed 's/$/Data/' | sort > available.txt

echo "Imported calculators ($(wc -l < imported.txt)):"
cat imported.txt
echo

echo "Available calculator files ($(wc -l < available.txt)):"
cat available.txt
echo

echo "Missing imports:"
comm -23 available.txt imported.txt
echo

echo "Unused imports:"
comm -13 available.txt imported.txt

# Cleanup
rm -f imported.txt available.txt
