export default async function handler(req, res) {
  const path = req.query.id
  const url =
    'https://app.usefathom.com/sites/83191/pages?from=2017-01-01%2000%3A00%3A00&to=2021-05-17%2023%3A59%3A59&site=83191&range=all_time&tz=Europe%2FBerlin'

  const data = await fetch(url).then((a) => a.json())

  const views = data.find((d) => d.pathname === `/${path}`)

  if (views) {
    res.json({
      views: views.views,
    })
  } else {
    res.json({ views: 0 })
  }
}
