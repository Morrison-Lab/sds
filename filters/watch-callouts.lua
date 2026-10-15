-- watch-callouts.lua
-- Makes each "Watch" (`.videos`) and "Read" (`.reading`) callout foldable and
-- anchored. Runs before coatless-quarto/custom-callout, which turns the div
-- into a callout and drops the div's own id.
--
-- * Foldable: sets `collapse="false"` on the div, which custom-callout passes to
--   the callout: it gets a fold toggle and starts open.
-- * Anchored: a div without an id gets one, `watch-<slug>` or `read-<slug>`,
--   from the id of an embedded video (`vid-...`), else the text of its first
--   link (or the YouTube id of that link), else its first paragraph, made unique
--   within the page. The id goes on a wrapper div around the callout, so
--   `page.html#watch-...` links to it. An id the author wrote is kept as it is.
-- A single div opts out of folding with `collapse="none"`.

local prefix = { videos = 'watch', reading = 'read' }
local used = {}

local function slug(text)
  local s = pandoc.text.lower(text):gsub('[^%w]+', '-'):gsub('^-+', ''):gsub('-+$', '')
  -- Keep ids short enough to read in a URL, cut at a word boundary.
  if #s > 50 then
    s = s:sub(1, 50):gsub('-[^-]*$', '')
  end
  return s
end

local function first_label(div)
  local label = nil
  -- An embedded video's own id, `vid-starmer-cnn`, names the box best. This
  -- needs a pass of its own: a walk visits a nested paragraph before the div
  -- that holds it.
  div:walk({
    Div = function(inner)
      if label == nil and inner.identifier:match('^vid%-') then
        label = inner.identifier:gsub('^vid%-', '')
      end
    end
  })
  if label then return label end
  div:walk({
    Link = function(link)
      if label == nil then
        local text = pandoc.utils.stringify(link.content)
        local video = link.target:match('youtube%.com/watch%?v=([%w_-]+)')
          or link.target:match('youtu%.be/([%w_-]+)')
        local lower = pandoc.text.lower(text)
        -- A timestamp link ("from 6:55") names a place in a video, not the video.
        local stamp = lower:match('^from%s') or lower:match('^at%s') or lower:match('^[%d:%s]+$')
        if text ~= '' and not stamp and not text:match('^https?:') then
          label = text
        elseif video then
          label = video
        end
      end
    end
  })
  if label then return label end
  div:walk({
    Para = function(para)
      if label == nil then label = pandoc.utils.stringify(para) end
    end
  })
  return label
end

function Div(div)
  for _, class in ipairs(div.classes) do
    local pre = prefix[class]
    if pre then
      -- `collapse="none"` skips only the folding; the box is still anchored.
      if div.attributes.collapse == 'none' then
        div.attributes.collapse = nil
      else
        -- An author's explicit `collapse="true"` starts the box folded.
        div.attributes.collapse = div.attributes.collapse or 'false'
      end
      local id = div.identifier
      div.identifier = ''
      if id == '' then
        local name = slug(first_label(div) or '')
        local base = pre .. '-' .. (name ~= '' and name or 'box')
        id = base
        local n = 1
        while used[id] do
          n = n + 1
          id = base .. '-' .. n
        end
      end
      used[id] = true
      return pandoc.Div({ div }, pandoc.Attr(id, { 'watch-anchor' }))
    end
  end
  return nil
end
