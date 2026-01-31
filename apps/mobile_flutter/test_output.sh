#!/bin/bash
 
echo "Running tests..."

flutter test --coverage > test_output.txt 2>&1
 
echo "----------------------------------"
 
# Extract test summary line like:

# 00:58 +27 -20: Some tests failed.
 
SUMMARY_LINE=$(grep -E "\+[0-9]+ -[0-9]+" test_output.txt | tail -1)
 
PASSED=$(echo $SUMMARY_LINE | grep -oP '\+\K[0-9]+')

FAILED=$(echo $SUMMARY_LINE | grep -oP '-\K[0-9]+')
 
if [ -z "$PASSED" ]; then PASSED=0; fi

if [ -z "$FAILED" ]; then FAILED=0; fi
 
TOTAL=$((PASSED + FAILED))
 
# Coverage calculation

TOTAL_LINES=$(grep -E "^LF:" coverage/lcov.info | awk -F: '{sum+=$2} END {print sum}')

COVERED_LINES=$(grep -E "^LH:" coverage/lcov.info | awk -F: '{sum+=$2} END {print sum}')

COVERAGE=$(awk "BEGIN { printf \"%.2f\", ($COVERED_LINES/$TOTAL_LINES)*100 }")
 
echo "Total Tests: $TOTAL"

echo "Passed:      $PASSED"

echo "Failed:      $FAILED"

echo "Coverage:    $COVERAGE%"

echo "----------------------------------"
 
if (( $(echo "$COVERAGE < 60" | bc -l) )); then

  echo "WARNING: Coverage below 60% requirement"

else

  echo "Coverage meets requirement"

fi

 