**Report Rendering Improvements**

**Before Improvements**

**Sort by Country and Population**
- **Commit Duration:** 1.9 s
- **Render Duration:** 225 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/before/sort/image-4.png)
- **Ranker Chart:** [Screenshot](./public/report/before/sort/image-5.png)

**Add New Column**
- **Commit Duration:** 2.7 s
- **Render Duration:** 723 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/before/column/image.png)
- **Ranker Chart:** [Screenshot](./public/report/before/column/image-1.png)

**Search Country**
- Analyze by first letter
- **Commit Duration:** 2.4 s
- **Render Duration:** 237.5 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/before/search/image.png)
- **Ranker Chart:** [Screenshot](./public/report/before/search/image-1.png)

**Select Year**
- **Commit Duration:** 4.1 s
- **Render Duration:** 237.9 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/before/year/image.png)
- **Ranker Chart:** [Screenshot](./public/report/before/year/image-1.png)


**After Improvements**

**Sort by Country and Population**
- **Commit Duration:** 1.9 s
- **Render Duration:** 51.9 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/after/sort/image.png)
- **Ranker Chart:** [Screenshot](./public/report/after/sort/image-1.png)

**Add New Column**
- **Commit Duration:** 1.4 s
- **Render Duration:** 122 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/after/column/image.png)
- **Ranker Chart:** [Screenshot](./public/report/after/column/image-1.png)

**Search Country**
- Analyze by first letter
- **Commit Duration:** 1.8 s
- **Render Duration:** 27.4 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/after/search/image.png)
- **Ranker Chart:** [Screenshot](./public/report/after/search/image-1.png)

**Select Year**
- **Commit Duration:** 2.1 s
- **Render Duration:** 307 ms
- **Interactions:** Not recorded
- **Flame Graph:** [Screenshot](./public/report/after/year/image.png)
- **Ranker Chart:** [Screenshot](./public/report/after/year/image-1.png)


**Optimization Summary**

- **Sorting by Country and Population**
    - Render Duration: 225 ms → 51.9 ms
    - Commit Duration: 1.9 s

- **Adding a New Column**
    - Commit Duration: 2.7 s → 1.4 s
    - Render Duration: 723 ms → 122 ms

- **Search by Country**
    - Commit Duration: 2.4 s → 1.8 s
    - Render Duration: 237.5 ms → 27.4 ms

- **Select Year**
    - Commit Duration: 4.1 s → 2.1 s
    - Render Duration: 237.9 ms → 307 ms