# define snake_case with uppercase acronyms allowed;
# see https://github.com/r-lib/lintr/issues/2844 for details:
withr::local_package("rex")
snake_case_ACROs1 <- rex::rex(
  start,
  maybe("."),
  list(some_of(upper), maybe("s"), zero_or_more(digit)) %or% list(some_of(lower), zero_or_more(digit)),
  zero_or_more(
    "_",
    list(some_of(upper), maybe("s"), zero_or_more(digit)) %or% list(some_of(lower), zero_or_more(digit))
  ),
  end
)

linters <- lintr::linters_with_defaults(
  return_linter = NULL,
  trailing_whitespace_linter = NULL,
  lintr::pipe_consistency_linter(pipe = "|>"),
  lintr::object_name_linter(
    regexes = c(snake_case_ACROs1 = snake_case_ACROs1)
  )
)

# prevent warnings from lintr::read_settings:
rm(snake_case_ACROs1)
exclusions <- list(
  `data-raw` = list(
    pipe_consistency_linter = Inf
  )
  # NOTE: `sds` (the self-referential `sds -> .` symlink -- see CLAUDE.md) is
  # NOT excluded here on purpose. lintr::lint_dir()/lint_package() resolve
  # every exclusion path through normalize_path() (lintr:::normalize_exclusions()),
  # which follows symlinks. Because `sds` points at the repo root, ANY
  # exclusion naming it -- the directory itself, or any file path under it --
  # normalizes to the exact same absolute path as the real file it aliases,
  # so it silently excludes the real file too, not just the symlinked
  # duplicate. There is no exclusions-list syntax that can single out the
  # duplicate without also matching the original. The actual fix lives in
  # the CI workflows (lint-project.yaml, lint-changed-files.yaml), which
  # remove the `sds` symlink from the checkout before invoking lintr at all,
  # so lintr's own directory walk never sees it and no exclusion is needed.
)
