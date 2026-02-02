# #!/bin/bash
 
# echo "Running tests..."

# flutter test --coverage > test_output.txt 2>&1
 
# echo "----------------------------------"
 
# # Extract test summary line like:

# # 00:58 +27 -20: Some tests failed.
 
# SUMMARY_LINE=$(grep -E "\+[0-9]+ -[0-9]+" test_output.txt | tail -1)
 
# PASSED=$(echo $SUMMARY_LINE | grep -oP '\+\K[0-9]+')

# FAILED=$(echo $SUMMARY_LINE | grep -oP '-\K[0-9]+')
 
# if [ -z "$PASSED" ]; then PASSED=0; fi

# if [ -z "$FAILED" ]; then FAILED=0; fi
 
# TOTAL=$((PASSED + FAILED))
 
# # Coverage calculation

# TOTAL_LINES=$(grep -E "^LF:" coverage/lcov.info | awk -F: '{sum+=$2} END {print sum}')

# COVERED_LINES=$(grep -E "^LH:" coverage/lcov.info | awk -F: '{sum+=$2} END {print sum}')

# COVERAGE=$(awk "BEGIN { printf \"%.2f\", ($COVERED_LINES/$TOTAL_LINES)*100 }")
 
# echo "Total Tests: $TOTAL"

# echo "Passed:      $PASSED"

# echo "Failed:      $FAILED"

# echo "Coverage:    $COVERAGE%"

# echo "----------------------------------"
 
# if (( $(echo "$COVERAGE < 60" | bc -l) )); then

#   echo "WARNING: Coverage below 60% requirement"

# else

#   echo "Coverage meets requirement"

# fi

#!/bin/bash

# 1. Run all tests and capture output to test.txt
echo "🚀 Running Flutter tests..."
flutter test --coverage > test_output.txt 2>&1

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "✅ Tests passed! (Results saved to test.txt)"
else
    echo "❌ Some tests failed. Check test.txt for details."
fi

# 2. Generate HTML report
echo "📊 Generating HTML coverage report..."

# Check if genhtml (lcov) is installed
if ! command -v genhtml &> /dev/null; then
    echo "⚠️ Error: 'genhtml' not found. Please install lcov (e.g., 'brew install lcov')."
    exit 1
fi

genhtml coverage/lcov.info -o coverage/html

# 3. Open the report based on Operating System
echo "🌐 Opening report..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open coverage/html/index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open coverage/html/index.html
else
    echo "Could not detect OS to open browser automatically. Path: coverage/html/index.html"
fi 