/* ============================================================
   DATA LOADER — runs BEFORE script.js
   اگر localStorage خالی باشه (بازدیدکننده جدید / مرورگر جدید)،
   داده‌ها رو از data.json (که از پنل ادمین ساخته و به GitHub
   پوش شده) می‌خونه و توی localStorage می‌ریزه.
   اگر localStorage از قبل پر باشه (مثلاً همون مرورگر ادمین)،
   دست نمی‌زنه تا تغییرات محلی از بین نرن.
   ============================================================ */
(function () {
  try {
    // اگر قبلاً یه بار دیتا لود شده، دیگه کاری نکن
    if (localStorage.getItem('ahs_profile_data')) return;

    var xhr = new XMLHttpRequest();
    // مسیر نسبی data.json (کنار index.html و script.js)
    xhr.open('GET', 'data.json', false); // false = synchronous
    xhr.send(null);

    if (xhr.status !== 200 && xhr.status !== 0) return; // status 0 برای file:// لوکال

    var data = JSON.parse(xhr.responseText);

    var setJSON = function (key, value) {
      if (value === undefined || value === null) return;
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    };
    var setStr = function (key, value) {
      if (value === undefined || value === null) return;
      try { localStorage.setItem(key, value); } catch (e) {}
    };

    // پروفایل
    if (data.profile) setJSON('ahs_profile_data', data.profile);

    // تنظیمات
    if (data.settings) {
      if (data.settings.theme)     setStr('ahs_theme', data.settings.theme);
      if (data.settings.layout)    setStr('ahs_layout', data.settings.layout);
      if (data.settings.font)      setStr('ahs_font', data.settings.font);
      if (data.settings.favicon)   setStr('ahs_favicon', data.settings.favicon);
      if (data.settings.pageTitle) setStr('ahs_pagetitle', data.settings.pageTitle);
    }

    // چیپ‌های مهارت
    if (data.skillChips) setJSON('ahs_skill_chips', data.skillChips);

    // پروژه‌ها / مهارت‌ها
    setJSON('ahs_custom_projects', data.customProjects);
    setJSON('ahs_custom_skills', data.customSkills);

    // تحصیلات / تجربه / مدارک
    setJSON('ahs_custom_edu', data.education);
    setJSON('ahs_custom_exp', data.experience);
    setJSON('ahs_custom_certs', data.certs);

    // هایلایت‌ها
    setJSON('ahs_custom_highlights', data.customHighlights);
    setJSON('ahs_deleted_highlights', data.deletedHighlights);

    // استوری‌ها
    setJSON('ahs_custom_stories', data.customStories);
    setJSON('ahs_deleted_stories', data.deletedStories);

    // فید
    setJSON('ahs_feed_posts', data.feedPosts);

    // ریلز
    setJSON('ahs_reels', data.reels);

    // موزیک
    setJSON('ahs_custom_music', data.customMusic);

    // کدها / PDF ها
    setJSON('ahs_custom_codes', data.customCodes);
    setJSON('ahs_custom_pdfs', data.customPdfs);

  } catch (e) {
    console.warn('data-loader: failed to load data.json', e);
  }
})();
